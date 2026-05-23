import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../components/ui/Button";
import { data, Link } from "react-router-dom";
import Forminput from "../components/Forminput";

type FormData = {
    nama: string;
    email: string;
    password: string;
    password_confirm: string;
}

const schema = z.object({
    nama: z.string().min(1, "Nama harus di isi"),
    email: z.string().min(8, "Email harus di isi"),
    password: z.string().min(8, "password minimal 8 angka"),
    password_confirm: z.string().min(8, "harap tulis ulang password"),
});

export default function Register() {
    const { register, handleSubmit, formState: { errors }, } = useForm({ 
        resolver: zodResolver(schema) 
    });

    const onSubmit = (data: FormData) => {
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <Forminput
                    label="Masukan Nama"
                    tipe="text"
                    name="nama"
                    register={register}
                    error={errors.nama?.message}
                    placeholder="Masukan Nama"
                />
                
                <Forminput
                    label="Masukan Email"
                    tipe="text"
                    name="email"
                    register={register}
                    error={errors.email?.message}
                    placeholder="Masukan Email"
                />

                <Forminput
                    label="Buat Password"
                    tipe="password"
                    name="password"
                    register={register}
                    error={errors.password?.message}
                    placeholder="Masukan Password"
                />

                <Forminput
                    label="Konfirmasi Password"
                    tipe="password"
                    name="password_confirm"
                    register={register}
                    error={errors.password_confirm?.message}
                    placeholder="Masukan Kembali Password"
                />

                <div>
                    <Button label="Register" variant="primary" />
                </div>

            </form>

            <p className="mt-6">
                Sudah punya akun?
                <Link to="/login" className="text-blue-500">
                    Login di sini
                </Link>
            </p>
        </div>
    )
}

