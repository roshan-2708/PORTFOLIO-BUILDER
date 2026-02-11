import React from 'react'
import TemplateOne from '../Portfolio/builder_folder/templates/TemplateOne'
import TemplateTwo from './builder_folder/templates/TemplateTwo'
import TemplateThree from './builder_folder/templates/TemplateThree'

const TemplateRenderer = ({ template, data }) => {
    console.log("RAW TEMPLATE VALUE 👉", template)

    if (!template) {
        return (
            <div className="text-white text-center mt-20">
                Template not found
            </div>
        )
    }

    // Normalize everything
    const templateName = String(
        typeof template === "string"
            ? template
            : template?.name
    )
        .replace(/\s+/g, '')  // remove spaces
        .toLowerCase()

    console.log("NORMALIZED 👉", templateName)

    switch (templateName) {
        case "template1":
            return <TemplateOne data={data} />
        case "template2":
            return <TemplateTwo data={data} />
        case "template3":
            return <TemplateThree data={data} />

        default:
            return (
                <div className="text-white text-center mt-20">
                    Template not found
                </div>
            )
    }
}

export default TemplateRenderer
