const Menu = () => {
  return (
    <div className="fixed inset-0 grid place-content-center backdrop-blur">
      <div className="grid grid-cols-1 gap-8 bg-slate-500/60 rounded p-4">
        <input type="text" placeholder="Nickname" className="skull-input" />
        <div className="grid grid-cols-2 gap-2 items-end">
          <button className="skull-btn">Host</button>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Lobby Code"
              className="skull-input"
            />
            <button className="skull-btn">Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
