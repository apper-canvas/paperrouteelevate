import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import PublicationGrid from "@/components/organisms/PublicationGrid";
import PublicationForm from "@/components/organisms/PublicationForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { publicationService } from "@/services/api/publicationService";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);

  useEffect(() => {
    loadPublications();
  }, []);

  useEffect(() => {
    filterPublications();
  }, [publications, searchTerm]);

  const loadPublications = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await publicationService.getAll();
      setPublications(data);
    } catch (err) {
      setError("Failed to load publications");
    } finally {
      setLoading(false);
    }
  };

  const filterPublications = () => {
    if (!searchTerm) {
      setFilteredPublications(publications);
      return;
    }

    const filtered = publications.filter((publication) =>
      publication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publication.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publication.frequency.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPublications(filtered);
  };

  const handleAddPublication = () => {
    setEditingPublication(null);
    setShowForm(true);
  };

  const handleEditPublication = (publication) => {
    setEditingPublication(publication);
    setShowForm(true);
  };

  const handleDeletePublication = async (publicationId) => {
    if (window.confirm("Are you sure you want to delete this publication?")) {
      try {
        await publicationService.delete(publicationId);
        setPublications(publications.filter(p => p.Id !== publicationId));
      } catch (err) {
        setError("Failed to delete publication");
      }
    }
  };

  const handleSavePublication = async (publicationData) => {
    try {
      if (editingPublication) {
        const updatedPublication = await publicationService.update(editingPublication.Id, publicationData);
        setPublications(publications.map(p => 
          p.Id === editingPublication.Id ? updatedPublication : p
        ));
      } else {
        const newPublication = await publicationService.create(publicationData);
        setPublications([...publications, newPublication]);
      }
      setShowForm(false);
      setEditingPublication(null);
    } catch (err) {
      throw new Error("Failed to save publication");
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPublication(null);
  };

  if (loading) return <Loading type="grid" />;
  if (error) return <Error message={error} onRetry={loadPublications} />;

  if (showForm) {
    return (
      <PublicationForm
        publication={editingPublication}
        onSave={handleSavePublication}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Publications</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your newspaper and magazine catalog
          </p>
        </div>
        <Button onClick={handleAddPublication} className="flex items-center mt-4 sm:mt-0">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Publication
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search publications..."
          className="flex-1 sm:max-w-md"
        />
        
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="BookOpen" size={16} className="mr-2" />
          {filteredPublications.length} publication{filteredPublications.length !== 1 ? "s" : ""}
        </div>
      </div>

      {filteredPublications.length === 0 ? (
        <Empty
          icon="BookOpen"
          title="No publications found"
          description={searchTerm ? "Try adjusting your search terms" : "Add your first publication to get started"}
          actionText="Add Publication"
          onAction={searchTerm ? undefined : handleAddPublication}
        />
      ) : (
        <PublicationGrid
          publications={filteredPublications}
          onEdit={handleEditPublication}
          onDelete={handleDeletePublication}
        />
      )}
    </motion.div>
  );
};

export default Publications;