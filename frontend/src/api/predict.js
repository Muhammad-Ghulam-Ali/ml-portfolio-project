// Predict API

const predict = async (userInput) => {
    try {
        const res = await fetch('http://localhost:8000/predict/return', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInput)
        })

        const result = await res.json()

        if (!res.ok) {
            return {success: false, message: result.detail}
        }

        return {success: true, message: result}

    } catch {
        return {success: false, message: "Network failed."}
    }
}

export { predict }