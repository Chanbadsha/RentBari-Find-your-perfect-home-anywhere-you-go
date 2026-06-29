"use client";

import { authClient, signIn } from "@/app/lib/auth-client";
import {
  Button,
  Checkbox,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { MoveRight } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("next") || "/";

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userRole: "job-seeker",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setUser("");
    const { data: user, error } = await signIn.email(data);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    if (user) {
      setUser(user);
      setLoading(false);
      router.push(callbackUrl);
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = callbackUrl;
    }
  };

  // Handle Google Login
  const googleLogin = async () => {
    setGoogleLoading(true);
    const data = await authClient.signIn.social({
      provider: "google",
      redirectUrl: callbackUrl,
    });
    if (data) {
      setGoogleLoading(false);
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
        {/* EMAIL */}
        <TextField>
          <Label>Email</Label>
          <Input
            className={`placeholder:text-foreground bg-background border border-border`}
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-xs mt-0.5 text-red-500">
              {errors?.email?.message}
            </span>
          )}
        </TextField>

        {/* PASSWORD */}
        <TextField>
          <Label>Password</Label>
          <Input
            className={`placeholder:text-foreground bg-background border border-border`}
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter password"
          />
          {errors.password && (
            <span className="text-xs mt-0.5 text-red-500">
              {errors?.password?.message}
            </span>
          )}
        </TextField>

        {/* TERMS */}

        <TextField>
          <Checkbox
            {...register("terms", {
              required: "You must accept the terms",
            })}
            isSelected={isSelected}
            onChange={setIsSelected}
          >
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <span className="text-xs text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <span className="underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>
                .
              </span>
            </Checkbox.Content>
          </Checkbox>
          {errors.terms && (
            <span className="text-xs mt-0.5 text-red-500">
              {errors?.terms?.message}
            </span>
          )}
        </TextField>

        <div>
          {/* Feedback Message */}
          {error && (
            <div className="rounded-lg border border-danger/20 bg-danger/10 px-3 py-2 text-sm text-danger">
              {error?.message || "Failed to sign in. Please try again."}
            </div>
          )}

          {user && (
            <div className="rounded-lg border border-success/20 bg-success/10 px-3 py-2 text-sm text-success">
              {user?.message || "Successfully signed in."}
            </div>
          )}
        </div>

        {/* SUBMIT */}

        <Button
          type="submit"
          className="w-full h-11 font-medium"
          isPending={loading}
        >
          {({ isPending }) => (
            <>
              {isPending ? (
                <>
                  <Spinner color="current" size="sm" />
                  <span className="ml-2">Signing in...</span>
                </>
              ) : (
                <>
                  Continue
                  <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </>
          )}
        </Button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="h-px flex-1 bg-border" />

        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Or
        </p>

        <div className="h-px flex-1 bg-border" />
      </div>
      {/* Google Login */}
      <Button onClick={googleLogin} className="w-full" variant="tertiary">
        {googleLoading ? (
          <>
            {" "}
            <Spinner color="current" size="sm" />
            <span className="ml-2">Signing in...</span>
          </>
        ) : (
          <>
            {" "}
            <Icon icon="devicon:google" />
            Sign in with Google
          </>
        )}
      </Button>
    </div>
  );
};

export default LoginForm;
