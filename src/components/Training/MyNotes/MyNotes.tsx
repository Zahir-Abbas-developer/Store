import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

import SearchIcon from "../../../assets/icons/Search.png";
import "./MyNotes.scss";
import NotesTable from "./NotesTable";
import { debouncedSearch } from "../../../utils/utils";

const MyNotes = () => {
  const [showAddModal, setShowAddModal] = useState(false);


  
  const [searchNotes, setsearchNotes] = useState()
  
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setsearchNotes);
  };
  const paramsObj: any = {};
  if(searchNotes) paramsObj["search"]=searchNotes;
  const query = "&" + new URLSearchParams(paramsObj).toString();


  return (
    <div className="my-notes-wrapper">
      <div className="top-header">
        <Button className="add-note-btn fs-16 fw-600" onClick={() => setShowAddModal(true)}>
          Add Notes
        </Button>
        <div className="input-search-wrapper">
          <Input
            placeholder="search"
            prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
            onChange={debouncedResults}
          />
        </div>
      </div>
      <div className="my-notes-table">
        <NotesTable query={query} searchNotes={searchNotes} setsearchNotes={setsearchNotes} showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
      </div>
    </div>
  );
};

export default MyNotes;
