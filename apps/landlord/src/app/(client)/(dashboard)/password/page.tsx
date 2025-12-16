import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function passwordPage() {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 gap-5">
              <div className="grid gap-5">
                <Label htmlFor="old-password">Old Password</Label>
                <Input
                  id="old-password"
                  type="text"
                  placeholder="Old Password"
                  required
                />
              </div>
              <div className="grid gap-5">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="text"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="grid gap-5">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="text"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3">
          <Button type="submit" className="w-full sm:w-auto">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    );
}