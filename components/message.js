const Message = ({ children, avatar, username, description }) => {
    return (
        <div className="bg-white my-4 shadow-lg p-8 border-b-2 rounded-lg border border-slate-50">
            <div className="flex justify-between items-center gap-2 pb-4 border-b border-slate-100">
                <h2>{username}</h2>
                <img src={avatar} className="w-10 rounded-full" />
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
};

export default Message;