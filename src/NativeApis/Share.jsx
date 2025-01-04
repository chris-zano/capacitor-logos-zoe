import { Share } from "@capacitor/share";

function ShareApi({ button_text, data_to_share }) {
  const shareContent = async () => {
    try {
      await Share.share(data_to_share);
    } catch (error) {
      console.error("Sharing failed", error);
    }
  };

  return (
    <button
      onClick={shareContent}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        outline: "none",
      }}
    >
      {button_text}
    </button>
  );
}

export default ShareApi;


