import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation

function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate(); // Initialize navigate hook
  const location = useLocation(); // Initialize location hook

  // Function to handle back navigation
  const handleBackClick = () => {
    // Check if the current path is an admin login path
    if (location.pathname.startsWith("/login/admin")) {
      navigate("/login/admin"); // Navigate back to the admin portal selection
    } else {
      navigate("/login"); // Navigate back to the main login route
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-5 my-24">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your unique ID below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                {/* Unique ID Field */}
                <div className="grid gap-2">
                  <Label htmlFor="uniqueId">Registered ID Number</Label>
                  <Input
                    id="uniqueId"
                    type="text"
                    placeholder="Enter Unique ID"
                    {...register("uniqueId", {
                      required: "Unique ID is required",
                    })}
                  />
                  {errors.uniqueId && (
                    <p className="text-red-500 text-sm">
                      {errors.uniqueId.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 1,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {/* Back Button */}
                <Button
                  type="button"
                  className="w-full mt-2"
                  onClick={handleBackClick}
                >
                  Back
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LoginForm;
