import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label";


export default function CheckboxComponent() {
  return (
    <div className="flex flex-col gap-6 mt-5">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Vacation</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="toggle" />
        <Label htmlFor="toggle">Office Tour</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="toggle" />
        <Label htmlFor="toggle">Travel</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="toggle" />
        <Label htmlFor="toggle">Away</Label>
      </div>
    </div>
  );
}
