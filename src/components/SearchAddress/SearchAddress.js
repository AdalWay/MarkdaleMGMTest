import React from "react";
import { Input, Button } from "semantic-ui-react";

export default function SearchAddress({
  onChange,
  balance,
  disable,
  getBtcBalance
}) {
  return (
    <div>
      <Button
        content="Search"
        className="search-button"
        disabled={disable}
        onClick={getBtcBalance}
      />
      <Input
        className="search-input"
        placeholder="Search..."
        onChange={onChange}
      />
      <Input
        className="search-input"
        disabled={true}
        placeholder="Search..."
        value={parseFloat(balance)}
        onChange={onChange}
      />
    </div>
  );
}
