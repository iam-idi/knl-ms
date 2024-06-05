const userMainContent = document.querySelector('#userMainContent');
const templates = {
  userTemplate(_id, first_name, last_name, other_name, image, email, phone, role ) {
    userMainContent.innerHTML += 
        `<div
            id=${_id} class="w-[220px] sm:w-[245px] md:w-[270px] min-w-[200px] md:min-w-[300px] bg-gradient-to-br from-stone-800 to-red-900 p-2 rounded-lg my-2 transition transform md:hover:scale-105">

            <div
                class="editBtn text-right text-sm font-semibold sm:text-base sm:font-bold cursor-pointer transform active:scale-95">
                <i class="fa-solid fa-pen-to-square text-blue-500"></i></div>
            <div class="flex items-center justify-center gap-2 md:gap-3">
                <img src="${image}" alt="" class="w-16 h-16 md:w-20 md:h-20 rounded-full">
                <div>
                    <h3 class="text-xs sm:text-sm md:text-base font-medium w-[12em]">${first_name+" "+ " "+last_name +" "+ (other_name != undefined ? other_name : "")}</h3>
                    <h3 class="text-xs sm:text-sm md:text-base font-medium w-[12em]">${email}</h3>
                    <h3 class="text-xs sm:text-sm md:text-base font-medium w-[12em]">${phone}</h3>
                    <h3 class="text-xs sm:text-sm md:text-base font-medium w-[12em]">${role}</h3>
                </div>
            </div>
            <div
                class="deleteBtn text-right text-sm font-semibold sm:text-base sm:font-bold cursor-pointer transform active:scale-95">
                <i class="fa-solid fa-trash text-red-500"></i>
                </div>

        </div>`
    },
};

export default templates;
