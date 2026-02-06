import TemplateRenderer from "./TemplateRenderer";


const PortfolioPreview = ({ template, userInfo }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden h-[500px]">
            <TemplateRenderer
                template={template}
                data={userInfo}
            />
        </div>
    );
};

export default PortfolioPreview;