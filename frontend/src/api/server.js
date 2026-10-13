// Server wake up

const serverWakeUp = async () => {
    try {
        const res = await fetch('http://localhost:8000/server/wakeup')
        const result = await res.json()
        return {success:true, message:result}

    } catch (err) {
        return {success:false, message:"Network failed"}
    }
}

export { serverWakeUp }