import { Brain, Lightbulb, Sparkles, TrendingUp } from "lucide-react"
import Container from "../Container/Container"
import { useEffect, useState } from "react"
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import conf from "../conf/conf";
import databaseService from "../appwrite/database";
import { setTransaction } from "../slices/transactionSlice";

function InsightPage(){
    const [insights , setInsights] = useState("");
    const [loading , setLoading] = useState(false);
    const transactions = useSelector((state) => state.transaction.transactions);
    const dispatch = useDispatch();
    
    useEffect(() => {
        databaseService.getAllExpenses().then((result)=> {
            dispatch(setTransaction(result.documents));
        })
    }, [])

    const getInsights = async () => {
        setLoading(true)
        setInsights(null)
        try {
            const simplified = transactions.map((t) => ({
                description : t.description,
                category : t.category,
                amount : t.amount,
                date : t.date
            })) 
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${conf.apiKey}`,{
                    method : "POST",
                    headers : {"Content-Type" : "application/json"},
                    body : JSON.stringify({
                        contents : [{
                            parts : [{
                                text: `
                                        You are a personal finance advisor.

                                        Analyse this expense data:

                                        ${JSON.stringify(simplified)}

                                        Respond ONLY in valid JSON using this format:

                                        {
                                        "summary": "One short summary.",
                                        "insights": [
                                            "Insight 1",
                                            "Insight 2",
                                            "Insight 3"
                                        ],
                                        "tips": [
                                            "Tip 1",
                                            "Tip 2"
                                        ]
                                        }

                                        Do not include markdown or explanations.
                                    `
                            }]
                        }]
                    })
                }
            )
            const data = await response.json();
            
            const text = data.candidates[0].content.parts[0].text;
            const aiData = JSON.parse(text);
            setInsights(aiData);
        } catch (error) {
            console.log(error);
            setInsights(null)
            
        }
        finally{
            setLoading(false)
        }
    }
    return(
        <div className="py-8">
            <Container>
                <h1 className="text-2xl font-semibold mb-6">AI Insights</h1>
                <div className="border border-gray-200 bg-white rounded-xl p-12 text-center">
                    {!insights && ( loading ? <p className="text-xl text-red-500 font-medium">Analyzing....</p> : 
                        <div>
                            <Brain className="w-12 h-12 mb-4 mx-auto text-indigo-400 " />
                            <p className="font-semibold" >Get AI-powered insights</p>
                            <p className="text-gray-600 mt-1 mb-2">Analyze your spending patterns and get personalize recommendations.</p>
                            <Button className="pl-5 pr-5" onClick={getInsights} disabled={loading} >
                                <Sparkles className="inline mr-1 w-5 mt-0 mb-1 h-5" /> Get Insights    
                            </Button>

                        </div>
                        
                    )}
                   {insights && (
                        <div className="flex flex-col text-left gap-6 items-center">

                            <div >
                                <div className="flex gap-1 text-indigo-700">
                                     <Brain />
                                    <h2 className="text-xl font-semibold mb-3">
                                        Summary
                                    </h2>
                                </div>
                              
                                <p className="text-gray-800 text-md leading-7 hover:shadow-sm hover:scale-102 transition-all duration-300 bg-indigo-50 border border-indigo-200 rounded-xl p-7">
                                    {insights.summary}
                                </p>
                            </div>

                            <div >
                                <div className="flex gap-1 text-amber-600">
                                    <Lightbulb />
                                    <h2 className="text-xl font-semibol mb-3">
                                        Key Insights
                                    </h2>
                                </div>

                                
                                <ul className="hover:scale-102 hover:shadow-md duration-300 transition-all rounded-xl space-y-3">
                                    {insights.insights?.map((item, index) => (
                                        <li
                                            key={index}
                                            className="bg-amber-50 border border-amber-400 rounded-xl p-5"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            
                            </div>

                            <div >
                                <div className="flex gap-1 text-green-700">
                                    <TrendingUp />
                                    <h2 className="text-xl font-semibold mb-3">
                                        Saving Tips
                                    </h2>
                                </div>

                                <ul className="hover:shadow-md hover:scale-102 duration-300 rounded-xl transition-all space-y-3">
                                    {insights.tips?.map((tip, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-2 bg-green-50 border border-green-200 rounded-xl p-5"
                                        >
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button className="w-90 text-center" onClick={getInsights} disabled={loading}>
                                <Sparkles className="inline mr-1 w-5 mt-0 mb-1 h-5" /> Regenerate    
                            </Button>                
                        </div>
                        
                        
                    )}


                </div>

            </Container>
        
        </div>
    )
}
export default InsightPage