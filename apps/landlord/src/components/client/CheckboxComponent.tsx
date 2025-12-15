import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label";


export default function CheckboxComponent() {
  return (
    <div className="flex flex-col gap-6 mt-5">
      <div className="flex items-center gap-3">
        <Checkbox id="Vacation" />
        <Label htmlFor="Vacation">Vacation</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="Office Tour" />
        <Label htmlFor="Office Tour">Office Tour</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="Travel" />
        <Label htmlFor="Travel">Travel</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="Away" />
        <Label htmlFor="Away">Away</Label>
      </div>
    </div>
  );
}
