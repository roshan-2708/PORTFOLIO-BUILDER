import React from 'react'
import TemplateOne from '../Portfolio/builder_folder/templates/TemplateOne'

const TemplateRenderer = ({ template, data }) => {

    if (!template) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                Select a template to preview
            </div>
        )
    }

    switch (template.name) {
        case "Template 1":
            return <TemplateOne data={data} />;
        // case "Template 2":
        //     return <TemplateTwo data={data} />;
        // case "Template 3":
        //     return <TemplateThree data={data} />;
        default:
            return null;
    }
};
export default TemplateRenderer;
