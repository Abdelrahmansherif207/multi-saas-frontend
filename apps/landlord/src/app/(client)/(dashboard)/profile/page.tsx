import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function profilePage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-2 gap-5">
            <div className="grid gap-5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="" required />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="text" placeholder="" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Egypt">Egypt</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Algeria">Algeria</SelectItem>
                    <SelectItem value="South Africa">South Africa</SelectItem>
                    <SelectItem value="Bahrain">Bahrain</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-5">
              <Label htmlFor="state">state</Label>
              <Input id="state" type="text" placeholder="" required />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="company">Company</Label>
              <Input id="company" type="text" placeholder="" required />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" type="text" placeholder="" required />
            </div>
            <div className="grid gap-5">
              <Label htmlFor="city">City</Label>
              <Input id="city" type="text" placeholder="" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-5">
        <Button type="submit">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
