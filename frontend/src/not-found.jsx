import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <h2>404</h2>
            <p>
                <span>
                    The link you followed may be broken, or the page may have been removed.
                </span>
                <Link>
                    Go to home page
                </Link>
            </p>

        </div>
    )
}

export default page