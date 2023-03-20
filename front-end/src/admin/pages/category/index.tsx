import React, { useEffect, useState } from "react";
import MasterLayoutAdmin from "../../MasterLayoutAdmin";
import styles from "./Category.module.scss";
import { TextField, Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CategoryType } from "../../../types";
import categoryServices from "../../../services/category";
import checkDataApi from "../../../utils/checkDataApi";
import { confirmAlert } from "react-confirm-alert";
import AddIcon from "@mui/icons-material/Add";
// import { RootState } from "../../../redux/store/store";
// import { useSelector } from "react-redux";

const Category = () => {
  const [listCategory, setListCategory] = useState<CategoryType[]>([]);
  const [valueCategory, setValueCategory] = useState<string>("");
  // const dataUserStore = useSelector(
  //   (state: RootState) => state.useSearch.dataSearch
  // );

  // const dataSearch = dataUserStore;
  const fetchCategory = async () => {
    const dataCategory = await categoryServices.getCategoryApi();
    const result = checkDataApi(dataCategory);
    if (result && result.data) {
      setListCategory(result.data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleOnchange = (e: any) => {
    setValueCategory(e.target.value);
  };

  const handleClickCreateCategory = async () => {
    if (!valueCategory) {
      console.log("Deo co data");
    } else {
      const data = await categoryServices.createCategoryApi(valueCategory);
      const result = checkDataApi(data);
      if (result) {
        setValueCategory("");
        fetchCategory();
      }
    }
  };

  const handleClickDeleteCategory = async (id: number) => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const data = await categoryServices.deleteCategoryApi(id);
            const result = checkDataApi(data);
            if (result) {
              setValueCategory("");
              fetchCategory();
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <MasterLayoutAdmin>
      <div className={styles.container}>
        <h1>Category</h1>
        <Stack direction="row" paddingY={2} gap={2}>
          <TextField
            onChange={handleOnchange}
            value={valueCategory}
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            size="small"
            className={styles.textField}
            placeholder="Add category"
          />
          <Button onClick={handleClickCreateCategory} variant="contained">
            <AddIcon />
          </Button>
        </Stack>
      </div>
      <ul className={styles.list}>
        {listCategory &&
          listCategory?.map((item) => (
            <li key={item.id} className={styles.item}>
              {item.name_category}
              <DeleteIcon onClick={() => handleClickDeleteCategory(item.id)} />
            </li>
          ))}
      </ul>
    </MasterLayoutAdmin>
  );
};

export default Category;
