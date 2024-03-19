let doctorsCache = null;
let treatmentsCache = null;
let blogsCache = null;

module.exports = {
  // Doctors Cache
  getDoctorsCache: () => doctorsCache,
  setDoctorsCache: (newCache) => {
    doctorsCache = newCache;
  },
  updateDoctorsCache: (doctorId) => {
    if (!doctorsCache) return;
    doctorsCache = doctorsCache.filter(
      (doctor) => doctor._id.toString() !== doctorId
    );
  },
  addDoctorToCache: (newDoctor) => {
    if (!doctorsCache) return;
    doctorsCache.push(newDoctor);
  },
  



  // Treatments Cache
  getTreatmentsCache: () => treatmentsCache,
  setTreatmentsCache: (newCache) => {
    treatmentsCache = newCache;
  },
  updateTreatmentsCache: (treatmentId) => {
    if (!treatmentsCache) return;
    treatmentsCache = treatmentsCache.filter(
      (treatment) => treatment._id.toString() !== treatmentId
    );
  },
  addTreatmentToCache: (newTreatment) => {
    if (!treatmentsCache) return;
    treatmentsCache.push(newTreatment);
  },


  // Blogs Cache
  getBlogsCache: () => blogsCache,
  setBlogsCache: (newCache) => {
    blogsCache = newCache;
  },
  updateBlogsCache: (blogId) => {
    if (!blogsCache) return;
    blogsCache = blogsCache.filter((blog) => blog._id.toString() !== blogId);
  },
};
