import { useForm } from "react-hook-form";
import Forminput from "../components/Forminput"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// tentukan data
type FormData = {
    email: string;
    password: string;
};

// schema validasi
const schema = z.object({
    email: z.string().min(1, "Email harus diisi"),
    password: z.string().min(8, "Password minimal 8 angka"),
});

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const onSubmit = (data: FormData) => {
        if(data.email == "24090137" && data.password == "24090137") {
            // login sukses
            alert("login sukses");
            login(data.email);
            navigate("/dashboard");
        } else {
            // login gagal
            alert("login gagal");
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Forminput
                    label="Masukan Email"
                    tipe="text"
                    name="email"
                    register={register}
                    error={errors.email?.message}
                    placeholder="Email"
                />

                <Forminput
                    label="Masukan Password"
                    tipe="password"
                    name="password"
                    register={register}
                    error={errors.password?.message}
                    placeholder="password"
                />

                <div>
                    <Button label="Login" variant="primary" />
                </div>
            </form>

            <p className="mt-6">
                Belum punya akun?
                <Link to="/register" className="text-blue-500">
                    Daftar di sini
                </Link>
            </p>
        </div>
    )
}