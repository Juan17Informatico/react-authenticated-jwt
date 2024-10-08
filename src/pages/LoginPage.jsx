import * as Yup from "yup";
import { InputLabel } from "../components/input/InputLabel";
import { Formik } from "formik";
import { Button } from "../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../services";
import { useAppDispatch } from "../store";
import { loginUser } from "../store/authSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const LoginPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLogged } = useSelector(state => state.auth);

    useEffect(() => {
        if(isLogged) {
            navigate("/dashboard");
        }
    }, [isLogged]);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("El correo no es válido").required("El correo es requerido"),
        password: Yup.string()
            .min(5, "Minimo 5 caracteres")
            .max(50, "Maximo 50 caracteres")
            .required("La contraseña es requerida"),
    });

    const onSubmit = (values) => {
        console.log({ values });

        dispatch( loginUser(values) ).then( (response) => {
            
            if(response.type === "auth/loginUser/fulfilled" ) {
                navigate("/dashboard");
            }else {
                Swal.fire({
                    icon: "error",
                    title: "Credenciales incorrectas",
                    showConfirmButton: false
                  });
            }
            
        }); 

        // Api.post("/auth/login", values).then((response) => {
        //     console.log(response);
        // });
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Inicio de sesión
                            </h1>
                            <Formik
                                initialValues={{}}
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
                                            label="Contraseña"
                                            name="password"
                                            placeholder="*********"
                                            type="password"
                                            errorMessage={errors.password}
                                            onChange={handleChange}
                                            value={values.password}
                                        />
                                        <Button value="Ingresar" />
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            ¿No tienes una cuenta?{" "}
                                            <Link
                                                to="/register"
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            >
                                                Crear Cuenta
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
