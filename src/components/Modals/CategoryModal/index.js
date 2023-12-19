import React, {useState} from "react";
import {useSelector} from "react-redux";

import {Checkbox, Form, Modal} from "antd";

import useBaseScreen from "../../../hooks/useBaseScreen";

import {FormContainer, StyledCheckbox} from "./styles";

export default function CategoryModal({categories, isVisible, close, onSubmit}) {
  const {dispatchAction, $} = useBaseScreen();
  const [form] = Form.useForm();
  const [checkedCategories, setCheckedCategories] = useState([]);

  const theGuardianCategories = useSelector((state) => state.news.theGuardianCategories);
  const newYorkTimesCategories = useSelector((state) => state.news.newYorkTimesCategories);
  const saveUserPreferredCategoriesLoading = useSelector((state) => state.user.saveUserPreferredCategoriesLoading);
  const uniqueCategories = Array.from(new Set([...theGuardianCategories, ...newYorkTimesCategories]));

  const handleOk = () => {
    dispatchAction($().SAVE_PREFERRED_CATEGORIES_REQUEST, checkedCategories);
    onSubmit();
  };

  const handleClose = () => {
    if (!categories?.length) {
      dispatchAction($().SET_CATEGORY_MODAL_CANCELED, true);
    }
    close();
  };

  const checkboxOnChange = (checkedValues) => {
    setCheckedCategories(checkedValues);
  };

  return (
    <Modal
      title="Categories"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleClose}
      okButtonProps={{loading: saveUserPreferredCategoriesLoading}}
      cancelButtonProps={{loading: saveUserPreferredCategoriesLoading}}>
      <FormContainer>
        <Form form={form} layout="vertical">
          <div>
            <Checkbox.Group defaultValue={categories} onChange={checkboxOnChange}>
              {uniqueCategories.map((c, i) => (
                <StyledCheckbox key={i} value={c}>
                  {c}
                </StyledCheckbox>
              ))}
            </Checkbox.Group>
          </div>
        </Form>
      </FormContainer>
    </Modal>
  );
}
