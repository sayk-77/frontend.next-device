'use client'

import { Container, ProductCarousel, Title } from "@/components/shared";
import Breadcrumbs from "@/components/shared/breadCrumb";
import { Button, ToggleGroup, ToggleGroupItem } from "@/components/ui";
import axios from "axios";
import { Database, Palette, Star, ShoppingBasket, Heart, Shield } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL

const rating = [1,2,3,4,5]

export default function ProductPage({ params: { searchName } }: { params: { searchName: string } }) {
    const [product, setProduct] = useState<Product>({} as Product)
    
    useEffect(() => {
        const getProductById  = async (searchName: string) => {
            try {
                const response = await axios.get(`${API_URL}/products/${searchName}`)
                setProduct(response.data)
                console.log(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        getProductById(searchName)
    }, [searchName])
    
    const customBreadCrumbs = [
        { label: product.brand?.name, href: `/brands/${product.brand?.name}` },
        { label: product.category?.title || 'Категория', href: `/brands/${product.brand?.name}/category/${product.category?.title}` },
        { label: product.name, href: `/product/${product.searchName}` },
    ];

    return (
        <div className="p-6">
            <Container>
            <Breadcrumbs customBreadcrumbs={customBreadCrumbs}/>
                <div className="flex flex-col md:flex-row pt-[30px]">
                    <div className="flex-1">
                        <ProductCarousel carouselItems={product.images} />
                    </div>
    
                    <div className="flex-1 pr-10  flex-col justify-between max-w-[800px]">
                        <div>
                            <Title text={product.name} className="text-[32px] pb-[10px]" />
                            <p className="text-gray-700 max-w-[600px]">
                                {product.description}
                            </p>
    
                            <div className="flex items-center gap-2 pt-5">
                                <span className="text-green-600 font-semibold">В наличии {product.stock} шт.</span>
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
                            
                            <div className="flex gap-[30px] items-center justify-between pt-[20px]">
                                <span className="text-2xl">Цена: от <strong>{product.price}</strong></span>
                                <div className="flex items-center gap-5">
                                    <Button className="rounded-[10px]"><ShoppingBasket size={24}/></Button>
                                    <Button className="rounded-[10px]"><Heart size={24}/></Button>
                                    <Button className="rounded-[10px]">Купить</Button>
                                </div>
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
            </Container>
        </div>
    );
}
