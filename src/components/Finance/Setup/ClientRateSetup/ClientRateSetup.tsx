import { useState } from "react";
import { Button, Input } from "antd";
import { debouncedSearch } from "../../../../utils/utils";
import AddClientRateSetupModal from "./AddClientRateModal/AddClientRateSetupModal";
import ClientsRateSetupAccordians from "./ClientsRateSetupAccordians";
import Search from "../../../../assets/icons/Search.png";
import "./ClientRateSetup.scss";

const ClientRateSetup = () => {
  const [isAddClientRate, setIsAddClientRate] = useState(false);
  const [searchValue, setSearchValue] = useState<any>();

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  return (
    <>
      <div className="client-rate-setup-main">
        <div className="client-rate-setup-header">
          <div>
            <Button
              type="primary"
              className="client-rate-add-button border-radius-2"
              onClick={() => setIsAddClientRate(true)}>
              Add Client Rate
            </Button>
          </div>
          <div className="input-search-wrapper">
            <Input placeholder="search" className="client-search-input" onChange={debouncedResults} prefix={<img src={Search} alt="search icon" className="icon" />} />
          </div>
        </div>
        <div style={{ marginBlock: "20px", height: '60vh', overflowY: 'scroll', paddingInline: '5px' }}>
          <ClientsRateSetupAccordians searchValue={searchValue} />
        </div>
      </div>
      {isAddClientRate && <AddClientRateSetupModal isAddClientRate={isAddClientRate} setIsAddClientRate={setIsAddClientRate} />}
    </>
  );
};

export default ClientRateSetup;
