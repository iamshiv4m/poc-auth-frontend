import React, { useEffect, useRef, useState } from "react";
import { googleAuthSignIn } from "../../service/api.url";

declare var google: any;

const GoogleSignIn = () => {
  const gbtnContainer = useRef(null);
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [access_token, setAccess_token] = useState<string>("");

  const callGoogleAuthSignIn = async (data: any) => {
    console.log("data: ", data);
  };

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (typeof google !== "undefined" && google.accounts) {
        google.accounts.id.initialize({
          client_id:
            "626063976766-b8s9bf68eepiurla4dreq8s1l2gq56mi.apps.googleusercontent.com",
          callback: handleGoogleSignIn,
        });
        google.accounts.id.renderButton(
          gbtnContainer.current,
          { theme: "outline", size: "large" } // customization attributes
        );
      }
    };

    const handleGoogleSignIn = async (response: any) => {
      console.log("response: ", response);
      if (response) {
        const data = {
          client_id: response.clientId,
          accessToken: response?.credential,
          type: "GOOGLE",
        };

        setUserData(data);
        setSignedIn(true);
        // Call the API with the data object
        const apiResponse = await callGoogleAuthSignIn(data);
      }
    };

    loadGoogleScript();
  }, []);

  const handleBackToElectronClick = () => {
    if (userData) {
      console.log("Back to Electron with data:", userData);
      // Open the Electron app with the custom protocol
      const url = `classroomx:?accessToken=${access_token}`;
      window.location.href = url;
    }
    // Close the browser after navigating to Electron
  };

  return (
    <div>
      {signedIn ? (
        <button onClick={handleBackToElectronClick}>Open ClassroomX</button>
      ) : (
        <div ref={gbtnContainer}></div>
      )}
    </div>
  );
};

export default GoogleSignIn;
