import { ProductCarousel, Title } from "@/components/shared";
import { Button, ToggleGroup, ToggleGroupItem } from "@/components/ui";
import { Database, Palette, Star, ShoppingBasket, Heart, Shield } from "lucide-react";

const items = [
    {
        id: 1,
        imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/320/250/3b55cc47c16dcccbe0031f6cc80707f9/a571943317c536941223f6847b2cff2535f6f8d1b34c49ce598d8fdcae0573ac.jpg",
        title: "iPhone 16 Pro",
    },
    {
        id: 2,
        imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/320/250/03dba3507a15c41abceee2dca4272b3a/8247a9f6aabbe832b1af63afb8f4ea058244863851a79a1eba083bd3f4678552.jpg",
        title: "iPhone 16 Pro",
    },
    {
        id: 3,
        imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/320/250/297de5721077a0c1a7b960608068da0a/bf342589f8a977cf44dec1cb3557197683c1e0ee2b13d8095717ce836dceabaf.jpg",
        title: "iPhone 16 Pro",
    },
    {
        id: 4,
        imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/320/250/911416226cb9a715ecce8dd914f3160d/f67eade14dc3dc2288c106b57f6d0ba5c048a77132658747b4399682706b6cef.jpg",
        title: "iPhone 16 Pro",
    },
    {
        id: 5,
        imageUrl: "https://c.dns-shop.ru/thumb/st1/fit/320/250/1dc41a35d3b14dbbb9d2f17ab12cddda/b97796604726a41be5f19054f3d78f21da100d7beffed7bcf5b1c922e41b5183.jpg",
        title: "iPhone 16 Pro",
    }
];

const rating = [1,2,3,4,5]

export default function ProductPage({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="p-6">
            <nav className="mb-4">
                <ul className="flex space-x-2 text-gray-500">
                    <li><a href="#" className="hover:text-blue-600">Каталог</a></li>
                    <li><span>/</span></li>
                    <li><a href="#" className="hover:text-blue-600">Смартфоны и фототехника</a></li>
                    <li><span>/</span></li>
                    <li><a href="#" className="hover:text-blue-600">Смартфоны и гаджеты</a></li>
                    <li><span>/</span></li>
                    <li><a href="#" className="hover:text-blue-600">Смартфоны</a></li>
                    <li><span>/</span></li>
                    <li className="font-semibold">6.9" Смартфон Apple iPhone 16 Pro Max 512 ГБ бежевый</li>
                </ul>
            </nav>

            <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                    <ProductCarousel carouselItems={items} />
                </div>

                <div className="flex-1 pr-10 flex flex-col justify-between">
                    <div>
                        <Title text="6.9'' Смартфон Apple iPhone 16 Pro Max 512 ГБ бежевый" size="xl" />
                        <p className="text-gray-700">
                            6 ядер - 6x(3.89 ГГц), 8 ГБ, 1 SIM, Super Retina XDR, 2868x1320, камера 48+48+12 Мп, NFC, 5G, GPS
                        </p>

                        <div className="flex items-center gap-2 pt-5">
                            <span className="text-green-600 font-semibold">В наличии ... шт.</span>
                            <span className="text-gray-500">— Гарантия возврата в течение 14 дней</span>
                        </div>
                    </div>

                    <div className="flex gap-10 items-center pt-5">
                        <div className="flex items-center gap-2">
                            <Database size={24} />
                            <p>Память (гб):</p>
                        </div>
                        <div className="flex gap-2">
                            <ToggleGroup type="single">
                              <ToggleGroupItem value="128" className="data-[state=on]:bg-gray-200">
                                128
                              </ToggleGroupItem>
                              <ToggleGroupItem value="256" disabled className="data-[state=on]:bg-gray-200">
                                256
                              </ToggleGroupItem>
                              <ToggleGroupItem value="512" className="data-[state=on]:bg-gray-200">
                                512
                              </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>

                    <div className="flex gap-10 items-center pt-5">
                        <div className="flex items-center gap-2">
                            <Palette size={24} />
                            <p>Цвет:</p>
                        </div>
                        <div className="flex gap-2">
                        <ToggleGroup type="single">
                              <ToggleGroupItem value="Бежевый" className="data-[state=on]:bg-gray-200">
                                Бежевый
                              </ToggleGroupItem>
                              <ToggleGroupItem value="Черный" disabled className="data-[state=on]:bg-gray-200">
                                Черный
                              </ToggleGroupItem>
                              <ToggleGroupItem value="Синий"  className="data-[state=on]:bg-gray-200">
                                Синий
                              </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>
                    
                    <div className="flex gap-10 items-center pt-5">
                        <div className="flex items-center gap-2">
                            <Shield size={24} />    
                            <p>Гарантия:</p>
                        </div>
                        <div className="flex gap-2">
                        <ToggleGroup type="single">
                              <ToggleGroupItem value="Бежевый" className="data-[state=on]:bg-gray-200">
                                12 мес.
                              </ToggleGroupItem>
                              <ToggleGroupItem value="Черный" disabled className="data-[state=on]:bg-gray-200">
                                24 мес.
                              </ToggleGroupItem>
                              <ToggleGroupItem value="Синий"  className="data-[state=on]:bg-gray-200">
                                36 мес.
                              </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>
                    
                    <div className="flexs items-center pt-5 flex-col">
                        <div className="flex items-center gap-5 text-[20px]">
                            <Star size={24} />
                            <p>Рейтинг:</p>
                            <span className="text-yellow-500 text-[32px] flex">
                                {rating.map((i) => (
                                    <Star key={i} size={28} color="orange" />
                                ))}
                            </span>
                        </div>

                        <div className="flex items-center gap-5 mt-3">
                            <Button className="rounded-[10px]"><ShoppingBasket size={24}/></Button>
                            <Button className="rounded-[10px]"><Heart size={24}/></Button>
                            <Button className="rounded-[10px]">Купить</Button>
                        </div>
                    </div>
                </div>
            </div>
            
            

            <div className="pt-10 max-w-900">
                <div className="pt-10 mx-auto">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Описание:</h3>
                    <p className="text-gray-700 leading-relaxed bg-gray-200 p-4 border border-gray-200 rounded-md shadow-sm">
                        iPhone 16 Pro Max создан вместе с Apple Intelligence, персональной интеллектуальной системой, которая помогает вам писать, выражать себя и выполнять задачи без усилий. Благодаря новаторской защите конфиденциальности вы можете быть уверены, что никто другой не сможет получить доступ к вашим данным — даже Apple. 
                        Apple Intelligence разработан для защиты вашей конфиденциальности на каждом этапе. Он интегрирован в ядро iPhone посредством обработки на устройстве, поэтому он знает о вашей личной информации, не собирая ее.
                        iPhone 16 Pro Max имеет титановый корпус Grade 5 с изысканной микроструйной отделкой, что делает эту модель невероятно прочной и впечатляюще легкой.
                        Теперь вы можете сделать идеальное фото или видео в рекордно короткие сроки благодаря управлению камерой. 
                        Феноменально мощный чип A18 Pro позволяет Apple Intelligence с более быстрым Neural Engine, улучшенным CPU и GPU, а также большим скачком в пропускной способности памяти.
                    </p>
                </div>
                
                <div className="pt-10">
                    <h3 className="text-lg font-semibold mb-3">Характеристики:</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between p-3 bg-gray-200 border rounded-md shadow-sm w-full">
                            <span className="font-medium text-gray-700">Операционная система:</span>
                            <span className="font-semibold text-gray-900">iOS 16</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-200 border rounded-md shadow-sm w-full">
                            <span className="font-medium text-gray-700">Оперативная память:</span>
                            <span className="font-semibold text-gray-900">8 ГБ</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-200 border rounded-md shadow-sm w-full">
                            <span className="font-medium text-gray-700">Хранение:</span>
                            <span className="font-semibold text-gray-900">512 ГБ</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-200 border rounded-md shadow-sm w-full">
                            <span className="font-medium text-gray-700">Камера:</span>
                            <span className="font-semibold text-gray-900">48+48+12 Мп</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-200 border rounded-md shadow-sm w-full">
                            <span className="font-medium text-gray-700">Беспроводные технологии:</span>
                            <span className="font-semibold text-gray-900">NFC, 5G</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
