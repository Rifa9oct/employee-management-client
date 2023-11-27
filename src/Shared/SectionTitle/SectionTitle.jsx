

const SectionTitle = ({heading,subTitle}) => {
    return (
        <div className="pt-32 mb-8 text-center font-bold">
            <p className="text-lg text-cyan-500">---- {subTitle} ----</p>
            <h1 className="text-4xl">{heading}</h1>
        </div>
    );
};

export default SectionTitle;