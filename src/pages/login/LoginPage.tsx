import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "../../lib/utils";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import * as Yup from "yup";
import ReusableFormikForm from "../../components/molecules/ReusableFormikForm";
import { regexPatterns } from "../../lib/validators/regexPatterns";
import { useLogin } from "../../services/auth/authService";
import { showErrorToast, showSuccessToast } from "../../lib/utils/toast";
import { ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();

  const initialValues = {
    username: "",
    password: "",
  };

  const loginValidationSchema = Yup.object({
    username: Yup.string()
      .matches(regexPatterns.username, "El nombre de usuario no es válido.")
      .required("El nombre de usuario es obligatorio."),

    password: Yup.string()
      .matches(
        regexPatterns.passwordMinLength,
        "Debe tener al menos 8 caracteres."
      )
      .matches(
        regexPatterns.passwordLowercase,
        "Debe contener al menos una letra minúscula."
      )
      .matches(
        regexPatterns.passwordUppercase,
        "Debe contener al menos una letra mayúscula."
      )
      .matches(
        regexPatterns.passwordNumber,
        "Debe contener al menos un número."
      )
      .matches(
        regexPatterns.passwordSymbol,
        "Debe incluir al menos un símbolo (ej. @, #, $, !, %)."
      )
      .matches(
        regexPatterns.noWhitespace,
        "No puede contener espacios en blanco."
      )
      .required("La contraseña es obligatoria."),
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await loginMutation.mutateAsync(values);
      showSuccessToast("Inicio de sesión exitoso 🎉");
      navigate("/dashboard");
      setIsAuthenticated(true);

      window.location.reload();
    } catch (error) {
      showErrorToast((error as Error).message);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ReusableFormikForm
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
              formId="login-form"
              className={cn("flex flex-col gap-6")}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                  Inicia sesión en tu cuenta
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Ingresa tu nombre de usuario para acceder a tu cuenta
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Nombre de usuario</Label>
                  <Field
                    as={Input}
                    name="username"
                    type="text"
                    placeholder="Tu usuario"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Field
                    as={Input}
                    name="password"
                    type="password"
                    placeholder="Contraseña..."
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </ReusableFormikForm>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
