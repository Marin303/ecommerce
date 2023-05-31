import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function DeleteProductPage(){
    const router = useRouter('')
    function goBack(){
        router.push('/products')
    }
    return(
        <Layout>
            Do you really want to delete product X?
            <button>Yes</button>
            <button onClick={goBack}>No</button>
        </Layout>
    )
}