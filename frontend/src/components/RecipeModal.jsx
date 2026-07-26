import { Modal } from "antd";
import RecipeForm from "./RecipeForm";

function RecipeModal(props) {
    return (
        <Modal
            title={props.editMode ? "Edit Recipe" : "Add Recipe"}
            open={props.open}
            onCancel={props.onClose}
            footer={null}
            destroyOnClose
        >
            <RecipeForm {...props} />
        </Modal>
    );
}

export default RecipeModal;
