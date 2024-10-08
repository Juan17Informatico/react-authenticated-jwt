import { Formik } from "formik";
import { InputLabel } from "../components/input/InputLabel";
import { Button } from "../components/button/Button";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/authSlice";
import { useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const RegisterPage = () => {

    const dispatch = useAppDispatch();

    const { isLogged } = useSelector(state => state.auth);

    useEffect(() => {
        if(isLogged) {
            navigate("/dashboard");
        }
    }, [isLogged]);

    const navigate = useNavigate();
    const initialValues = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "el nombre debe de tener minimo tres letras")
            .required("El nombre es requerido"),
        email: Yup.string().email("El correo no es válido").required("El correo es requerido"),
        password: Yup.string()
            .min(5, "Minimo 5 caracteres")
            .max(50, "Maximo 50 caracteres")
            .required("La contraseña es requerida"),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref("password"), "Las contraseñas no coinciden"])
            .required("La confirmación de la contraseña es requerida"),
    });

    const onSubmit = (values, { setFieldError } ) => {
        console.log({ values });

        dispatch( registerUser(values) ).then( (response) => {
            
            if(response.type === "auth/registerUser/fulfilled" ) {
                navigate("/dashboard");
            } else {
                Object.entries(response.payload.errors).forEach(([key, value]) => {
                    setFieldError( key, value[0]);
                    
                });
            }
            
        }); 

    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Crear Cuenta
                            </h1>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors, handleChange, handleSubmit }) => (
                                    <form onSubmit={handleSubmit} action="" className="space-y-5">
                                        <InputLabel
                                            label="Correo"
                                            name="email"
                                            placeholder="example@gmail.com"
                                            errorMessage={errors.email}
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                        <InputLabel
                                            label="Nombre"
                                            name="name"
                                            placeholder="Juan Pablo..."
                                            errorMessage={errors.name}
                                            onChange={handleChange}
                                            value={values.name}
                                        />
                                        <InputLabel
                                            label="Contraseña"
                                            name="password"
                                            placeholder="*********"
                                            type="password"
                                            errorMessage={errors.password}
                                            onChange={handleChange}
                                            value={values.password}
                                        />
                                        <InputLabel
                                            label="Confirmar Contraseña"
                                            name="password_confirmation"
                                            placeholder="*********"
                                            type="password"
                                            errorMessage={errors.password_confirmation}
                                            onChange={handleChange}
                                            value={values.password_confirmation}
                                        />
                                        <Button value="Registrar" />
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            ¿Ya tienes una cuenta?{" "}
                                            <Link
                                                to="/login"
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            >
                                                Iniciar sesión
                                            </Link>
                                        </p>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
