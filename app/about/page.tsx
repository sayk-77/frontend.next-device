import { Container } from '@/components/shared';
import { NextPage } from 'next';
import Image from 'next/image';
const AboutUs: NextPage = () => {
  return (
    <Container className="p-8 mt-[20px] mb-[20px] bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.png"
          alt="Логотип NextDevice"
          height={64}
          width={400}
          className="h-16"
        />
      </div>
      <h1 className="text-3xl font-bold mb-6">О нас</h1>
      <p className="mb-4">
        Добро пожаловать в <strong>NextDevice</strong> — ваш надежный онлайн-магазин электроники, где вы найдете все необходимое для современных технологий. Мы стремимся предоставить нашим клиентам широкий ассортимент высококачественной электроники по конкурентоспособным ценам.
      </p>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Наша миссия</h2>
      <p className="mb-4">
        Наша миссия — сделать покупки электроники удобными и доступными для каждого. Мы тщательно отбираем товары, чтобы предлагать только лучшее нашим клиентам, обеспечивая высокие стандарты качества и сервиса.
      </p>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Что мы предлагаем</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Широкий ассортимент электроники: смартфоны, ноутбуки, гаджеты и аксессуары.</li>
        <li>Конкурентоспособные цены и регулярные акции.</li>
        <li>Быстрая доставка и удобные способы оплаты.</li>
        <li>Качественная поддержка клиентов — мы всегда готовы помочь вам с выбором и ответить на ваши вопросы.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Почему выбирают нас</h2>
      <p className="mb-4">
        Мы понимаем, что покупка электроники — это важное решение, и мы готовы помочь вам на каждом этапе. Наша команда экспертов постоянно следит за новыми трендами и технологиями, чтобы предложить вам только актуальные и востребованные товары.
      </p>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Свяжитесь с нами</h2>
      <p className="mb-4">
        Если у вас есть вопросы или предложения, пожалуйста, не стесняйтесь обращаться к нам по электронной почте: <a href="mailto:support@nextdevice.ru" className="text-blue-500 underline">support@nextdevice.ru</a>. Мы будем рады помочь вам!
      </p>
      <p className="mt-8">
        Спасибо, что выбрали <strong>NextDevice</strong>. Мы надеемся, что ваши покупки будут приятными и удобными!
      </p>
    </Container>
  );
};
export default AboutUs;