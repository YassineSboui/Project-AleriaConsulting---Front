import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { useState } from "react";

export default function UserRoleSelect({ handlechange }) {
  const [displayedRole, setDisplayedRole] = useState("Administrateur");

  return (
    <FormControl fullWidth>
      <InputLabel fullWidth id="simple-select-label">
        Role
      </InputLabel>
      <Select
        labelId="simple-select-label"
        fullWidth
        required
        variant="outlined"
        onChange={(event) => {
          handlechange(event);
          setDisplayedRole(event.target.value);
        }}
        value={displayedRole}
      >
        <MenuItem value="Administrateur"> Administrateur </MenuItem>
        <MenuItem value="Agent"> Agent </MenuItem>
      </Select>
    </FormControl>
  );
}
