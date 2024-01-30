'use client'
import CardItem from "@/app/ui/CardItem"

export default function SideBar () {
    const cardInfo  = [{id: 0, title: "Savings", value: 98000}, {id: 1, title: "Income", value: 8600}, {id: 2, title: "Reoccurring", value: 179}]

    // TODO: fix the logic for this entirely, start encorporating the db into this beforehand to fetch cashflows
    function changeHandler (event: React.ChangeEvent<HTMLInputElement>) {
        return 
    }

    return (
        <div className="flex flex-col space-y-6">
            {cardInfo.map(item => 
                <CardItem key={item.id} title={item.title} value={`$${item.value}`} handleChange={changeHandler}/>
            )}
        </div>
    )
}