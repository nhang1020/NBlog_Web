import React from 'react'
import { motion } from "framer-motion"

const animation = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
}

const AnimationPage = ({ children }) => {
    return (
        <motion.div
            variants={animation}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    )
}

export default AnimationPage