

const SectionTitle = ({heading,subTitle}) => {
    return (
        <div className="text-center font-bold">
            <p className="text-lg text-cyan-500">---- {subTitle} ----</p>
            <h1 className="header text-3xl lg:text-4xl">{heading}</h1>
        </div>
    );
};

export default SectionTitle;