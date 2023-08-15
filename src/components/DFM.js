import React from "react";

export default function DFM(props) {
    // //https://app.launchdarkly.com/webhook/triggers/64db93eb608bf612ed2397e0/13ec27ae-59de-42e3-a6f5-619791398b2f
    return (
        <div style={{
            position: 'fixed',
            zIndex: '9999',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100vh',
            alignItems: "center", 
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            display: "flex",
            color: '#535368',
            backgroundColor: "#f9f9f9",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
        }}>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                margin: '0',
                transform: 'translateX(-50%) translateY(-50%)'
            }}>
                <img style={{margin:"auto", display: "block"}} src="toggle.png"/>
                <h1 style={{color: "#2f2e41", fontSize: "2.5rem", fontWeight:"700", marginBottom: "1rem"}}>This website is temporarily unavailable.</h1>
                <p style={{lineHeight: "1.6", fontSize: "1.4rem"}}>Scheduled maintenance is currently in progress.</p>
                <p style={{lineHeight: "1.6", fontSize: "1.4rem"}}>We'll be back shortly.</p>
            </div>
        </div>
    );

}