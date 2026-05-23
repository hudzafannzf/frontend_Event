import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../components/ui/Button";
import Forminput from "../components/Forminput";

const schema = z.object({
    nama: z.string().min(1, "Nama harus diisi!"),
    alamat: z.string().min(1, "Alamat wajib diisi!"),
    email: z.string().min(1, "Email wajib diisi!"),
    Bio: z.string().min(1, "Tolong isi Bio")
});

export default function Registrasievent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) })
    return (
        <div>
            <form onSubmit={handleSubmit(console.log())}>
                <Forminput
                    label="Masukan nama"
                    tipe="text"
                    name="nama"
                    register={register}
                    error={errors.nama?.message}
                    placeholder="nama"
                />

                <Forminput
                    label="Masukan alamat"
                    tipe="text"
                    name="alamat"
                    register={register}
                    error={errors.alamat?.message}
                    placeholder="Email"
                />

                <Forminput
                    label="Masukan Email"
                    tipe="text"
                    name="email"
                    register={register}
                    error={errors.email?.message}
                    placeholder="Email"
                />

                <Forminput
                    label="Masukan bio"
                    tipe="text"
                    name="bio"
                    register={register}
                    error={errors.Bio?.message}
                    placeholder="Email"
                />
                <div className="flex justify-center p-5">
                    <Button label="Registrasi" variant="primary" />
                </div>
            </form>
        </div>
    )
}