import { DatePicker } from "@material-ui/pickers";

export default function MyDatePicker({
  defaultValue,
  setDate,
  label,
  editable,
}) {
  return (
    <DatePicker
      fullWidth
      variant="dialog"
      disabled={editable}
      value={defaultValue}
      onChange={setDate}
      format="d MMM yyyy"
      clearLabel="vider"
      cancelLabel="annuler"
      label={label}
    />
  );
}
