import { Button } from "@/components/ui/button"
import { createCheckoutSession } from "@/lib/api/stripe";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";

const CheckoutButton = ({plan}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            const data = await createCheckoutSession(plan.planKey);

            if (!data?.url) {
                toast.error("Could not start checkout. Please try again.");
                return;
            }
            window.location.href = data.url;
        } catch (error) {
            const status = error?.response?.status;
            if (status === 401) {
                toast.error("You must be logged in to purchase credits.");
                router.push("/signin");
                return;
            }
            toast.error("Could not start checkout. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button onClick={handleCheckout} disabled={loading}
        className={`w-full ${ plan.highlighted ? "bg-blue-700 hover:bg-blue-800 text-white" : ""}`} variant={plan.highlighted ? "default" : "outline"}
        >
            {loading? "Opening checkout" : plan.buttonText}
        </Button>
    )
}

export default CheckoutButton
