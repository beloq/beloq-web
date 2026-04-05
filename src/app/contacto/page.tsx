import ContactForm from "../components/ContactForm";
import Image from "next/image";

export const metadata = {
  title: "Contacto - Beloq",
  description:
    "Contacta con Beloq. Solicita un presupuesto gratuito para estaciones de aparcamiento inteligente.",
};

export default function ContactoPage() {
  return (
    <section className="pt-32 pb-20 bg-beloq-gray min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Image
            src="/images/logo-black.png"
            alt="Beloq"
            width={150}
            height={50}
            className="h-10 w-auto mx-auto mb-6"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-beloq-dark">
            Hablemos
          </h1>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            ¿Quieres instalar Beloq en tu ciudad, campus o empresa? ¿Tienes
            dudas como usuario? Escríbenos y te respondemos en menos de 48
            horas.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10">
          <ContactForm />
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-2xl mb-2">📧</div>
            <h3 className="font-bold text-beloq-dark text-sm">Email</h3>
            <p className="text-gray-500 text-sm mt-1">contacto@beloq.es</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-2xl mb-2">📍</div>
            <h3 className="font-bold text-beloq-dark text-sm">Ubicación</h3>
            <p className="text-gray-500 text-sm mt-1">Valencia, España</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-2xl mb-2">⏰</div>
            <h3 className="font-bold text-beloq-dark text-sm">Respuesta</h3>
            <p className="text-gray-500 text-sm mt-1">Menos de 48 horas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
