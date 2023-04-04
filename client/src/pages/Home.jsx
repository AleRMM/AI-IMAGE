import React, {useState, useEffect} from "react";
import { Loader, Card, Form } from "../components/index.js";

//Renderizamos las cards generadas

const RenderCards = ({ data, title }) => {
    //Si la longitud de data es mayor a 0, es un arreglo y tiene elementos
    if (data?.length > 0) {
        // Devuelve una lista de componentes Card, donde cada Card utiliza los datos del post y un key único
        return data.map((post) => <Card key={post._id} {...post} />)
    } 

    return ( // Si data es null, undefined o su longitud es 0, devuelve este encabezado
    <h2 className="mt-5 font-bold text-[#1691B2] text-xl uppercase">
        {title}
    </h2>
    )
}

const Home = () => {

//Estados de los componentes
    const [loading, setLoading] = useState(false);
    const [allPost, setAllPost] = useState(null);

    const [search, setSearch] = useState("");
    const [searchedResults, setSearchedResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(()=>{
        const fetchPost = async () => {
            setLoading(true);
            try{
                const response = await fetch("http://localhost:6700/api/v1/post", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })
                if(response.ok){
                    const result = await response.json();
                    setAllPost(result.data.reverse());
                }
            }catch(error){
                alert(error)
            }finally{
                setLoading(false)
            }
        }
        fetchPost();
    },[]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);

        setSearchTimeout(setTimeout(() => {
                const searchResults = allPost.filter((item) => 
                item.name.toLowerCase().includes(search.toLowerCase()) || 
                item.prompt.toLowerCase().includes(search.toLocaleLowerCase()));

                setSearchedResults(searchResults);
            }, 500)
        );
    }

    return (
    
    <section className="max-w-7x1 mx-auto p-8 pt-5">

        <div>
            <h1 
            className="font-extrabold text-[#383A3C] text-[32px]">
                Creative community posts
            </h1>

            <p 
            className="mt-3 text-[#81909e] text-[16px] max-w-[700px]">
                Browse through different collections and styles of images created by Artificial Intelligence!!! 
            </p>
        </div>

        <div className="mt-5">
            <Form 
            labelName="Search an image"
            type="text"
            name="text"
            placeholder="Search..."
            value={search}
            handleChange={handleSearchChange}/>
        </div>

        <div className="mt-5">
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader/>
                </div>
            ) : (
                <>
                {search && (
                    <h2 className="font-medium text-[#81909e] text-xl mb-3">
                        Showing results for /
                        <span className="text-[#81909e]">{search}</span>
                    </h2>
                )}

                <div 
                className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                    {search ? (
                        <RenderCards 
                            data={searchedResults}
                            title= "No search results found"
                        />
                    ) : (
                        <RenderCards
                            data= {allPost}
                            title= "No post found"
                        />
                    )}
                </div>
                </>
            )}
        </div>

    </section>
    
    )
}

export default Home