import { useRef } from "react";
import { Button } from "@mui/material";
import AddPhotoIcon from "@mui/icons-material/AddAPhoto";

const styles = {
  button: {
    paddingBottom: 4,
    minWidth: 0,
    borderRadius: "50%",
  },
  input: {
    display: "none",
  },
};

const AddImage = (props: any) => {
  const hiddenFileInput = useRef(null) as any;

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <Button style={styles.button} variant="text" onClick={handleClick}>
        <AddPhotoIcon />
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={props.handleChange}
        style={styles.input}
      />
    </>
  );
};

export default AddImage;
