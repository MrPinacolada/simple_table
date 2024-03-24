<template lang="pug">
    default_layout
     div.wrapper 
        section.dashboard
            div.dashboard-title
                h2.font-h2 Мои товары
                img(src='../assets/image/icons/question-semibold.svg')
                p.font-gray 4 из 30
            div.dashboard-subtitle
                p.font-base Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
                p.font-base Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter
            div.dashboard-search
                base_input(he='50px' wh='60%' placeholder='Введите артикул продавца, артикул WB или ссылку на товар'  )
                    template(v-slot:top_slot)
                        p.font-caption Добавление товаров
                    template(v-slot:bottom_slot)
                        p.font-caption Например ваши товары: 
                            span.articul.underlined-dashed 119203059, 
                            span.articul.underlined-dashed 124366343, 
                            span.articul.underlined-dashed 59801844 

            div.dashboard-table
                table
                    thead
                        tr
                            th.column-checkbox
                                input(type="checkbox")
                            th.column-regular(v-for="column in columns" :key="column") {{ column }}
                    tbody
                        tr(v-for="(item, index) in items" :key="index")
                            td.column-checkbox
                                 input(type="checkbox")
                            td.column-images
                                img(:src='item.images[0]' lazy alt='photo')
                            td.column-id
                                p.font-base {{ item.remote_id }}
                            td.column-brand
                                p.font-base {{ truncateString(item.brand_name,13)||'Нет бренда' }}
                            td.column-title
                                p.font-base {{ truncateString(item.title,37)|| 'Нет названия'}}
                            td.column-quantity
                                p.font-base {{ item.quantity}}
                            td.column-price
                                p.font-base {{ Number(parseFloat(item.price)).toLocaleString() + ' ₽' }}
                            td.column-min
                                base_input(he='30px' wh='135px' placeholder='₽' :value='item.min_price' mask=true  )
                            td.column-max
                                base_input(he='30px' wh='135px' placeholder='₽' :value='item.max_price' mask=true )
                            td.column-delete
                                img(src="../assets/image/icons/delete.svg")



</template>

<script lang="ts">
import default_layout from "@/layouts/default.vue"
import base_input from "@/components/base/base_input.vue"
import { apiGet } from "@/services/api"
import { truncateString } from "@/helpers/truncateString"
import noimg from "@/assets/image/icons/no-image.svg"

interface Table_data {
    images: string[]
    remote_id: string
    brand_name: string
    title: string
    quantity: string
    price: string
    min_price: string
    max_price: string
    delete: string
}

export default {
    name: "dashboard",

    components: {
        default_layout,
        base_input,
    },
    data() {
        return {
            columns: [
                "Фото",
                "Артикул продавца",
                "Бренд",
                "Название",
                "Остаток, шт",
                "Текущая цена",
                "Минимальная цена",
                "Максимальная цена",
                "Удалить",
            ],
            items: [
                // {
                //     images: [],
                //     remote_id: "Data 2",
                //     brand_name: "Data 3",
                //     title: "Data 4",
                //     quantity: "Data 5",
                //     price: "Data 6",
                //     min_price: "Data 7",
                //     max_price: "Data 8",
                //     delete: "Data 9",
                // },
            ] as Table_data[],
            truncateString,
            noimg,
        }
    },
    methods: {
        async getTableData() {
            try {
                const data = await apiGet({ url: "product/" })
                if (!data?.data) return
                this.items = data.data.results
                this.items.forEach((item) => {
                    if (!item.images?.length) {
                        item.images.push(noimg)
                    }
                })
                console.log(data.data)
            } catch (error) {
                console.log("error: ", error)
            }
        },
    },
    mounted() {
        this.getTableData()
    },
}
</script>

<style scoped lang="scss">
.wrapper {
    display: grid;
    width: 100%;
    height: 100%;
    justify-items: center;
    align-items: start;
    .dashboard {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
        max-width: 1600px;
        min-width: 1600px;
        height: fit-content;
        background: var(--white);
        border-radius: 15px;
        box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.16);
        padding-top: 40px;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 60px;
        &-title {
            display: flex;
            gap: 12px;
            justify-content: flex-start;
            align-items: flex-end;
            width: 100%;
        }
        &-subtitle {
            display: grid;
            gap: 15px;
        }
        &-search {
            display: flex;
            justify-content: flex-start;
            .underlined-dashed {
                border-bottom: 1px dashed var(--gray);
            }
        }
        &-table {
            table {
                width: 100%;
                border-collapse: collapse;
                th,
                td {
                    border: none;
                    padding: 8px;
                    text-align: center;
                    height: 60px;
                }
                th {
                    &:not(:nth-child(-n + 2)) {
                        text-align: left;
                    }
                }
                tbody tr,
                th {
                    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                }
                .column {
                    &-checkbox {
                        width: 50px;
                    }
                    &-regular {
                    }
                    &-images {
                        img {
                            width: 50px;
                            height: 50px;
                            object-fit: contain;
                        }
                    }
                    &-delete {
                        img {
                            width: 25px;
                            height: 25px;
                        }
                    }
                }
            }
        }
    }
}
</style>
