import { Share } from "@capacitor/share";

function ShareApi({button_text}) {
  const shareContent = async () => {
    try {
      await Share.share({
        title: "Check this out!",
        text: "Here's some content to share.",
        url: "https://example.com",
        dialogTitle: "Share with friends",
      });
    } catch (error) {
      console.error("Sharing failed", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={shareContent}>{button_text}</button>
    </div>
  );
}

export default ShareApi;


