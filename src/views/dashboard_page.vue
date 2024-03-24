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
                base_button(placeholder='Добавить' is_disabled=true)

            div.dashboard-table
                table
                    thead
                        tr
                            th.column-checkbox
                                input.checkbox-base.checkbox-mixed(type="checkbox" :checked='is__head_checkbox')
                            th(v-for="column in columns" :key="column")
                                div.column-regular(@click='sortByNumbers(column.id,column.is_sorted), column.is_sorted = !column.is_sorted')
                                    p.font-gray {{ column.label }}
                                    img(v-if='column.is_sortable' :style='{ transform: column.is_sorted ? "rotate(180deg)" : "rotate(0)" }' src='../assets/image/icons/arrow.svg')
                        tr(v-show='is_head_actions')
                            th.column-menu(colspan="10")
                                div.flexbox
                                    div.wrapper-column
                                        div.delete-checked
                                            p.font-base Выбрано 2 из 4
                                            button.head-butt(@click='deleteSelected') 
                                                img(src='../assets/image/icons/delete-bold-small.svg')
                                                p.font-base Удалить выделенные
                                        //- div.reset-filters
                                        //-     p.font-base Выбрано 2 из 4
                                        //-     button.head-butt 
                                        //-         p.cont-base Сбросить фильтры
                                    div.price-edit
                                        p.font-base Для всех выделенных
                                        base_input(he='30px' wh='135px' placeholder='₽' @base_input='handleMinInput' mask=true  ) 
                                        base_input(he='30px' wh='135px' placeholder='₽' @base_input='handleMaxInput' mask=true  ) 

                    tbody
                        tr(v-for="(item, index) in items" :key="index")
                            td.column-checkbox
                                 input.checkbox-base(type="checkbox" v-model='item.is_checked')
                            td.column-images
                                img(:src='item.images[0]' lazy alt='photo')
                            td.column-id
                                button 
                                    img(src='../assets/image/icons/link.svg')
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
                                button 
                                    img(src="../assets/image/icons/delete.svg")



</template>

<script lang="ts">
import default_layout from "@/layouts/default.vue"
import base_input from "@/components/base/base_input.vue"
import { apiGet } from "@/services/api"
import { truncateString } from "@/helpers/truncateString"
import noimg from "@/assets/image/icons/no-image.svg"
import base_button from "@/components/base/base_button.vue"

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
    is_checked: boolean
}

export default {
    name: "dashboard",

    components: {
        default_layout,
        base_input,
        base_button,
    },
    data() {
        const columns = [
            {
                label: "Фото",
                is_sortable: false,
            },
            {
                label: "Артикул продавца",
                is_sortable: false,
            },
            {
                label: "Бренд",
                is_sortable: false,
            },
            {
                label: "Название",
                is_sortable: false,
            },
            {
                label: "Остаток, шт",
                is_sortable: true,
                id: "quantity",
                is_sorted: false,
            },
            {
                label: "Текущая цена",
                is_sortable: true,
                id: "price",
                is_sorted: false,
            },
            {
                label: "Минимальная цена",
                is_sortable: true,
                id: "min_price",
                is_sorted: false,
            },
            {
                label: "Максимальная цена",
                is_sortable: true,
                id: "max_price",
                is_sorted: false,
            },
            {
                label: "Удалить",
                is_sortable: false,
            },
        ]
        const items = [] as Table_data[]
        const is_head_actions = false

        return {
            columns,
            items,
            truncateString,
            noimg,
            is_head_actions,
        }
    },
    methods: {
        async getTableData() {
            try {
                const data = await apiGet({ url: "product/" })
                if (!data?.data) return
                this.items = data.data.results
                this.items = this.items.map((item) => {
                    if (!item.images?.length) {
                        item.images.push(noimg)
                    }

                    const newItem = {
                        ...item,
                        is_checked: false,
                    }
                    return newItem
                })
                console.log(data.data)
            } catch (error) {
                console.log("error: ", error)
            }
        },
        deleteSelected() {
            const to_delete = this.items.filter((item) => item.is_checked)
            const only_id = to_delete.map((item) => item.remote_id)
            console.log("Удалить", only_id)
        },
        handleMinInput(value: number) {
            this.items.forEach((item) => {
                if (item.is_checked) item.min_price = value.toLocaleString()
            })
        },
        handleMaxInput(value: number) {
            this.items.forEach((item) => {
                if (item.is_checked) item.max_price = value.toLocaleString()
            })
        },
        sortByNumbers(id: string, is_sorted: boolean) {
            if (!id) return
            this.items.sort((a, b) => {
                const valueA = parseFloat(a[id])
                const valueB = parseFloat(b[id])
                const sum = !is_sorted ? valueA - valueB : valueB - valueA
                return sum
            })
        },
    },
    computed: {
        is__head_checkbox() {
            this.is_head_actions = this.items.some((item) => item.is_checked)
            return this.is_head_actions
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
            align-items: center;
            gap: 20px;
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
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                    }
                    &-images {
                        img {
                            width: 50px;
                            height: 50px;
                            object-fit: contain;
                        }
                    }
                    &-delete {
                        button {
                            border: none;
                            background-color: transparent;
                            width: 25px;
                            height: 25px;
                            cursor: pointer;
                        }
                    }
                    &-id {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        button {
                            border: none;
                            background-color: transparent;
                            width: 25px;
                            height: 25px;
                            cursor: pointer;
                        }
                    }
                    &-menu {
                        background: rgba(19, 38, 57, 0.14);
                        .flexbox {
                            display: flex;
                            gap: 40px;
                            align-items: center;
                            width: 100%;
                            justify-content: space-between;

                            .wrapper-column {
                                display: flex;
                                gap: 40px;
                                align-items: center;
                                .head-butt {
                                    border: none;
                                    border-radius: 6px;
                                    background: rgb(242, 241, 243);
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: flex-start;
                                    align-items: center;
                                    padding: 5px 12px 5px 10px;
                                    gap: 5px;
                                    cursor: pointer;
                                    &:hover {
                                        background: linear-gradient(
                                                rgba(0, 0, 0, 0.05),
                                                rgba(0, 0, 0, 0.05)
                                            ),
                                            rgb(242, 241, 243);
                                    }
                                    &:active {
                                        background: linear-gradient(
                                                rgba(0, 0, 0, 0.1),
                                                rgba(0, 0, 0, 0.1)
                                            ),
                                            rgb(242, 241, 243);
                                    }
                                }
                                .delete-checked,
                                .reset-filters {
                                    display: flex;
                                    gap: 5px;
                                    align-items: center;
                                }
                            }

                            .price-edit {
                                display: flex;
                                gap: 58px;
                                align-items: center;
                                margin-right: 8.7em;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
