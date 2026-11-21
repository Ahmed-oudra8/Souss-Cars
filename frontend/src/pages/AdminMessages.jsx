
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEnvelope,
  faEnvelopeOpen,
  faTrash,
  faClock,
  faUser,
  faRotate
} from "@fortawesome/free-solid-svg-icons";

import api from "../services/api";
import "./AdminMessages.css";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/messages");

      setMessages(response.data.data || []);

    } catch (err) {
      console.error("Erreur messages:", err);
      setError("Impossible de charger les messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Changer le statut du message
  const toggleStatus = async (message) => {
    const newStatus =
      message.status === "unread" ? "read" : "unread";

    try {
      await api.put(
        `/admin/messages/${message.id}/status`,
        { status: newStatus }
      );

      setMessages((previous) =>
        previous.map((item) =>
          item.id === message.id
            ? { ...item, status: newStatus }
            : item
        )
      );

    } catch (err) {
      console.error(err);
      alert("Impossible de modifier le statut.");
    }
  };

  // Supprimer un message
  const deleteMessage = async (id) => {
    if (!window.confirm("Voulez-vous supprimer ce message ?")) {
      return;
    }

    try {
      await api.delete(`/admin/messages/${id}`);

      setMessages((previous) =>
        previous.filter((item) => item.id !== id)
      );

    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer le message.");
    }
  };

  const unreadCount = messages.filter(
    (message) => message.status === "unread"
  ).length;

  return (
    <div className="admin-messages">

      <div className="messages-header">

        <div>
          <span className="messages-label">COMMUNICATION</span>
          <h1>Messages des clients</h1>
          <p>Consultez et gérez les messages reçus.</p>
        </div>

        <button
          className="messages-refresh"
          onClick={fetchMessages}
        >
          <FontAwesomeIcon icon={faRotate} />
          Actualiser
        </button>

      </div>

      {/* STATISTICS */}

      <div className="messages-stats">

        <div className="message-stat-card">
          <div className="message-stat-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>

          <div>
            <span>Total messages</span>
            <h2>{messages.length}</h2>
          </div>
        </div>

        <div className="message-stat-card">
          <div className="message-stat-icon unread-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>

          <div>
            <span>Non lus</span>
            <h2>{unreadCount}</h2>
          </div>
        </div>

        <div className="message-stat-card">
          <div className="message-stat-icon read-icon">
            <FontAwesomeIcon icon={faEnvelopeOpen} />
          </div>

          <div>
            <span>Lus</span>
            <h2>{messages.length - unreadCount}</h2>
          </div>
        </div>

      </div>

      {/* MESSAGES LIST */}

      <div className="messages-list-header">
        <h2>Boîte de réception</h2>
        <span>{messages.length} messages</span>
      </div>

      {loading ? (

        <div className="messages-empty">
          Chargement des messages...
        </div>

      ) : error ? (

        <div className="messages-error">
          {error}
        </div>

      ) : messages.length === 0 ? (

        <div className="messages-empty">
          <FontAwesomeIcon icon={faEnvelope} />
          <h3>Aucun message pour le moment</h3>
          <p>Les messages des clients apparaîtront ici.</p>
        </div>

      ) : (

        <div className="messages-grid">

          {messages.map((message) => (

            <div
              className={`message-card ${
                message.status === "unread" ? "message-unread" : ""
              }`}
              key={message.id}
            >

              <div className="message-card-top">

                <div className="message-client">
                  <div className="message-avatar">
                    <FontAwesomeIcon icon={faUser} />
                  </div>

                  <div>
                    <h3>{message.name}</h3>
                    <span>{message.email}</span>
                  </div>
                </div>

                <span className={`message-status ${message.status}`}>
                  {message.status === "unread"
                    ? "Non lu"
                    : "Lu"}
                </span>

              </div>

              <div className="message-subject">
                <h4>{message.subject}</h4>
              </div>

              <p className="message-content">
                {message.message}
              </p>

              <div className="message-card-footer">

                <span className="message-date">
                  <FontAwesomeIcon icon={faClock} />
                  {new Date(message.created_at).toLocaleString("fr-FR")}
                </span>

                <div className="message-actions">

                  <button
                    className="message-read-btn"
                    onClick={() => toggleStatus(message)}
                  >
                    <FontAwesomeIcon
                      icon={
                        message.status === "unread"
                          ? faEnvelopeOpen
                          : faEnvelope
                      }
                    />

                    {message.status === "unread"
                      ? "Marquer comme lu"
                      : "Marquer non lu"}
                  </button>

                  <button
                    className="message-delete-btn"
                    onClick={() => deleteMessage(message.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminMessages;
