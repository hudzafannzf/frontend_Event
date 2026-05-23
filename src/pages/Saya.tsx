import { User } from "lucide-react"

export default function Saya() {
    return (
        <div className="flex justify-center align-middle items-center p-20">
            <div className="bg-gray-100 rounded-lg p-10 justify-center">
                <h2 className="text-4xl">Halo saya pengembang website ini</h2>
                <div className="flex max-w-20 bg-gray-200 justify-center rounded-lg">
                    <User size={50} />
                </div>
                <p>saya Dhiyaulhaq fakhri mohammad</p>
                <p>saya adalah mahasiswa dari universitas harkat negeri tegal</p>
                <p>NIM saya 24090113</p>
            </div>
        </div>
    )
}